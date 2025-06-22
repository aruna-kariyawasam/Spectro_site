# Downloads Directory Structure

This directory contains all downloadable files organized by category for optimal maintainability and security.

## Directory Structure

\`\`\`
public/downloads/
├── documents/           # Document files (PDFs, text files)
│   ├── thesis/         # Thesis and research documents
│   └── manuals/        # User manuals and guides
├── images/             # Image files
│   ├── gui/           # GUI screenshots and mockups
│   ├── hardware/      # Hardware photos and diagrams
│   └── diagrams/      # Technical diagrams and schematics
├── data/              # Data files
│   ├── spectral/      # Spectral measurement data
│   ├── calibration/   # Calibration data and standards
│   └── samples/       # Sample datasets
├── source/            # Source code archives
│   ├── frontend/      # Frontend application source
│   ├── firmware/      # Microcontroller firmware
│   └── scripts/       # Utility scripts and tools
└── archives/          # Compressed archives and backups
    ├── releases/      # Version releases
    └── backups/       # Backup files
\`\`\`

## File Naming Conventions

- Use descriptive names with version numbers
- Include date stamps for time-sensitive files
- Use underscores for spaces in filenames
- Include file type indicators where helpful

Examples:
- `Automated_Spectrophotometer_Thesis_2025.pdf`
- `GUI_Main_Interface_v2.png`
- `Sample_Spectral_Data_2025.csv`
- `STM32_Firmware_v1.0.zip`

## Security Considerations

- Protected files should be served through API routes
- Public files can be served directly from this directory
- Implement proper access control for sensitive documents
- Regular security audits of file permissions

## Maintenance

- Regular cleanup of outdated files
- Version control for important documents
- Backup strategy for critical files
- Monitor file sizes and storage usage
