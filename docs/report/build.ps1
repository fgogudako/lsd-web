$ErrorActionPreference = 'Stop'
Push-Location $PSScriptRoot
try {
    # Generated .tex files and copied images are already included.
    # Run py prepare_content.py separately only when the Markdown changes.
    # Windows PowerShell 5 can turn a redirected native stderr warning into a
    # terminating error. Use the actual compiler exit code as the build gate.
    $ErrorActionPreference = 'Continue'
    latexmk -xelatex -interaction=nonstopmode -halt-on-error -file-line-error -outdir=build main.tex
    $buildExitCode = $LASTEXITCODE
    $ErrorActionPreference = 'Stop'
    if ($buildExitCode -ne 0) { throw 'LaTeX compilation failed; see build/main.log.' }
    Copy-Item -LiteralPath 'build/main.pdf' -Destination '../bao-cao/bao-cao-nhom-3.pdf' -Force
} finally {
    Pop-Location
}
