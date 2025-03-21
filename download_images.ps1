# PowerShell script to download placeholder images

# Function to download an image
function Download-Image {
    param (
        [string]$Url,
        [string]$OutputPath
    )
    
    Write-Host "Downloading $Url to $OutputPath"
    
    try {
        Invoke-WebRequest -Uri $Url -OutFile $OutputPath
        Write-Host "Downloaded successfully: $OutputPath"
    }
    catch {
        Write-Host "Error downloading $Url : $_"
    }
}

# Create directories if they don't exist
$directories = @(
    "images",
    "images\products",
    "images\categories",
    "images\about",
    "images\team"
)

foreach ($dir in $directories) {
    if (-not (Test-Path $dir)) {
        New-Item -Path $dir -ItemType Directory -Force
        Write-Host "Created directory: $dir"
    }
}

# Product images
$productImages = @(
    @{Name = "headphones.jpg"; Size = "600x400"; Color = "4a6de5/ffffff" },
    @{Name = "fitness-tracker.jpg"; Size = "600x400"; Color = "4a6de5/ffffff" },
    @{Name = "mens-shirt.jpg"; Size = "600x400"; Color = "ff6b6b/ffffff" },
    @{Name = "womens-shoes.jpg"; Size = "600x400"; Color = "ff6b6b/ffffff" },
    @{Name = "water-bottle.jpg"; Size = "600x400"; Color = "28a745/ffffff" },
    @{Name = "candle.jpg"; Size = "600x400"; Color = "28a745/ffffff" },
    @{Name = "face-serum.jpg"; Size = "600x400"; Color = "ffc107/ffffff" },
    @{Name = "lip-balm.jpg"; Size = "600x400"; Color = "ffc107/ffffff" }
)

foreach ($image in $productImages) {
    $url = "https://via.placeholder.com/$($image.Size)/$($image.Color)?text=Product:+$($image.Name.Replace('.jpg', ''))"
    $outputPath = "images\products\$($image.Name)"
    Download-Image -Url $url -OutputPath $outputPath
}

# Category images
$categoryImages = @(
    @{Name = "electronics.jpg"; Size = "600x400"; Color = "4a6de5/ffffff" },
    @{Name = "fashion.jpg"; Size = "600x400"; Color = "ff6b6b/ffffff" },
    @{Name = "home.jpg"; Size = "600x400"; Color = "28a745/ffffff" },
    @{Name = "beauty.jpg"; Size = "600x400"; Color = "ffc107/ffffff" },
    @{Name = "sports.jpg"; Size = "600x400"; Color = "17a2b8/ffffff" },
    @{Name = "books.jpg"; Size = "600x400"; Color = "6f42c1/ffffff" }
)

foreach ($image in $categoryImages) {
    $url = "https://via.placeholder.com/$($image.Size)/$($image.Color)?text=Category:+$($image.Name.Replace('.jpg', ''))"
    $outputPath = "images\categories\$($image.Name)"
    Download-Image -Url $url -OutputPath $outputPath
}

# About images
$aboutImages = @(
    @{Name = "store-front.jpg"; Size = "800x500"; Color = "4a6de5/ffffff" },
    @{Name = "team-meeting.jpg"; Size = "800x500"; Color = "28a745/ffffff" }
)

foreach ($image in $aboutImages) {
    $url = "https://via.placeholder.com/$($image.Size)/$($image.Color)?text=About:+$($image.Name.Replace('.jpg', ''))"
    $outputPath = "images\about\$($image.Name)"
    Download-Image -Url $url -OutputPath $outputPath
}

# Team images
$teamImages = @(
    @{Name = "ceo.jpg"; Size = "400x500"; Color = "4a6de5/ffffff" },
    @{Name = "cto.jpg"; Size = "400x500"; Color = "ff6b6b/ffffff" },
    @{Name = "marketing.jpg"; Size = "400x500"; Color = "28a745/ffffff" },
    @{Name = "design.jpg"; Size = "400x500"; Color = "ffc107/ffffff" }
)

foreach ($image in $teamImages) {
    $url = "https://via.placeholder.com/$($image.Size)/$($image.Color)?text=Team:+$($image.Name.Replace('.jpg', ''))"
    $outputPath = "images\team\$($image.Name)"
    Download-Image -Url $url -OutputPath $outputPath
}

# Home page images
$homeImages = @(
    @{Name = "hero-bg.jpg"; Size = "1200x600"; Color = "333333/ffffff" },
    @{Name = "category-electronics.jpg"; Size = "400x300"; Color = "4a6de5/ffffff" },
    @{Name = "category-fashion.jpg"; Size = "400x300"; Color = "ff6b6b/ffffff" },
    @{Name = "category-home.jpg"; Size = "400x300"; Color = "28a745/ffffff" },
    @{Name = "category-beauty.jpg"; Size = "400x300"; Color = "ffc107/ffffff" }
)

foreach ($image in $homeImages) {
    $url = "https://via.placeholder.com/$($image.Size)/$($image.Color)?text=$($image.Name.Replace('.jpg', ''))"
    $outputPath = "images\$($image.Name)"
    Download-Image -Url $url -OutputPath $outputPath
}

Write-Host "All placeholder images have been downloaded."
