# PowerShell 脚本执行策略 (Execution Policy) 技术分析报告

## 1. 问题背景
在 Windows 环境下使用 Node.js 生态系统的命令行工具（如 `uipro`, `vue-cli`, `nodemon` 等）时，用户经常会遇到 `SecurityError: UnauthorizedAccess` 错误。具体表现为无法加载 `.ps1` 文件，提示“在此系统上禁止运行脚本”。

## 2. 根本原因：PowerShell 执行策略
PowerShell 的执行策略（Execution Policy）是 Windows 操作系统的一项安全功能，用于控制 PowerShell 加载配置文件和运行脚本的条件。其目的不是为了限制用户，而是为了防止恶意脚本在未经用户许可的情况下执行。

### 2.1 策略等级
Windows 定义了多种执行策略等级，常见的包括：

*   **Restricted**: 默认设置（适用于 Windows 客户端）。允许执行单个命令，但不允许运行脚本（包括 `.ps1` 配置文件）。
*   **AllSigned**: 仅运行由受信任的发布者签名的脚本。
*   **RemoteSigned**: 允许运行本地编写的脚本。对于从互联网下载的脚本（带有“Web 标记”），必须由受信任的发布者签名才能运行。这是开发者的推荐配置。
*   **Unrestricted**: 允许运行所有脚本。对于从互联网下载的脚本，在运行前会提示警告。
*   **Bypass**: 没有任何限制，没有任何警告或提示。通常用于临时自动化任务。

### 2.2 作用域 (Scope)
策略可以在不同的作用域生效：
*   **Process**: 仅对当前 PowerShell 进程有效。
*   **CurrentUser**: 仅对当前登录用户有效，存储在注册表的 `HKEY_CURRENT_USER`。
*   **LocalMachine**: 对计算机上的所有用户有效，存储在 `HKEY_LOCAL_MACHINE`（修改此项通常需要管理员权限）。

## 3. 运行机制分析
当用户在命令行输入 `uipro` 时，系统会在 `npm` 的全局路径（如 `C:\Users\<User>\AppData\Roaming\npm`）下寻找名为 `uipro` 的可执行文件。由于 Node.js 在 Windows 上会同时生成 `.cmd`（用于旧版 CMD）和 `.ps1`（用于 PowerShell）脚本，PowerShell 会优先尝试执行 `.ps1` 文件。

如果当前的 `ExecutionPolicy` 是 `Restricted`，PowerShell 在尝试加载并解析该 `.ps1` 脚本时会被安全拦截器拦截，从而抛出 `PSSecurityException` 异常。

## 4. 解决方案与实施建议

### 4.1 方案 A：更改当前用户策略（推荐）
这是最平衡安全与便利的方案。
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
*   **优点**: 只影响当前用户，无需每次启动管理员终端。
*   **缺点**: 稍微降低了系统的默认防御能力（但对于开发者是必要的）。

### 4.2 方案 B：临时跳过策略
如果你不想更改系统设置，可以在执行命令时动态指定策略：
```powershell
powershell -ExecutionPolicy Bypass -Command "uipro init --ai antigravity"
```
*   **适用场景**: 在 CI/CD 自动化流水线或脚本中执行。

## 5. 总结
解决 `uipro` 脚本无法运行的问题，本质上是在 Windows 安全沙箱与开发者生产力工具之间进行权限平衡。通过将策略设置为 `RemoteSigned`，我们可以确保本地 npm 工具正常运行，同时保留对不可信互联网脚本的基本审查能力。
