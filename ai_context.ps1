# --- CONFIGURATION ---
$OutputFile = "project_context.txt"
$IncludeExtensions = @(".js", ".ts", ".tsx", ".css", ".json", ".toml", ".yaml", ".md")
$ExcludeFolders = @("node_modules", ".git", "public", "resources", "build", ".hugo_build.lock", "dist")
$ExcludeFiles = @($OutputFile, "package-lock.json", "ai_context.ps1")

# --- TON INTRODUCTION ---
$Intro = @"
Nous allons vibe coder ensemble.

Si tu n'es pas sur je prefere que tu le dise et que tu pose des questions afin d affiner ta comprehension de la chose.
Fait des phrase simple et clair pas de charabia.

Quand il y a des modifications a faire dans plusieurs fichiers different je veux que tu fasse les fichier step by step et que tu me demande confirmation avant d aller sur un autre fichier afin de pouvoir faire des modifications en direct si besoin.

Voici ce que l'on va faire ensemble: 
Refonte de site vitrine d'esthetisme en Hugo (SSG) pour déploiement sur GitHub Pages. Objectifs : SEO optimal, performance et gratuite. Tracking d'audience via solutions privacy-friendly type Matomo ou Plausible. Themes et composants personnalisables pour adaptabilite. Est-ce que c est clair ?

Voici le context :
"@

# --- FONCTION ARBORESCENCE ---
function Get-Tree($Path, $Indent = "") {
    $Items = Get-ChildItem -Path $Path | Where-Object { 
        $_.Name -notin $ExcludeFolders -and $_.Name -notin $ExcludeFiles 
    }
    $Count = $Items.Count
    for ($i = 0; $i -lt $Count; $i++) {
        $IsLast = $i -eq ($Count - 1)
        $Prefix = "|-- " 
        $sb.AppendLine($Indent + $Prefix + $Items[$i].Name)
        if ($Items[$i].PSIsContainer) {
            Get-Tree $Items[$i].FullName ($Indent + "|   ")
        }
    }
}

# --- DEBUT DU TRAITEMENT ---
$sb = New-Object System.Text.StringBuilder
$sb.AppendLine($Intro)
$sb.AppendLine("`r`n=== ARBORESCENCE DU PROJET ===")
$sb.AppendLine((Get-Item .).Name)
Get-Tree (Get-Location).Path
$sb.AppendLine("`r`n=== CONTENU DES FICHIERS ===`r`n")

# --- CONCATÉNATION ---
$Files = Get-ChildItem -Recurse -File | Where-Object {
    $_.Extension -in $IncludeExtensions -and 
    $_.FullName -notmatch ($ExcludeFolders -join "|") -and
    $_.Name -notin $ExcludeFiles
}

foreach ($File in $Files) {
    $RelativePath = $File.FullName.Replace((Get-Location).Path, ".")
    $sb.AppendLine("--- FICHIER : $RelativePath ---")
    try {
        $Content = Get-Content $File.FullName -Raw -ErrorAction Stop
        $sb.AppendLine($Content)
    } catch {
        $sb.AppendLine("[ERREUR : Impossible de lire ce fichier]")
    }
    $sb.AppendLine("`r`n")
}

# Écriture finale
$sb.ToString() | Out-File -FilePath $OutputFile -Encoding utf8
Write-Host "Terminé ! Le contexte est dans $OutputFile" -ForegroundColor Green