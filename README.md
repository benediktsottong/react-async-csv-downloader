[![npm version](https://img.shields.io/npm/v/react-async-csv-downloader.svg)](https://www.npmjs.com/package/react-async-csv-downloader)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A simple and user-friendly React Hook library that enables asynchronous downloading of files, particularly CSV files. This library is ideal for applications that dynamically generate and download data.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
- [Types](#types)
- [Examples](#examples)
- [License](#license)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)

## Installation

To install the library in your project, run the following command in your terminal:

```bash
npm install react-async-csv-downloader
```

## Usage

To use the library, import the `useDownloadLink` hook and implement it in your component. Here’s a basic example demonstrating how to use the hook effectively.

## Examples

### Basic Example

```javascript
import React from 'react';
import { useDownloadLink } from 'async-file-download';
import { RawCSVExport } from './types';

const MyComponent = () => {
    const asyncResolver = async () => {
        // Simulate an asynchronous data fetch, e.g., from an API
        const response = await fetch('/api/data');
        const data = await response.json();
        
        return {
            file: new Blob([data], { type: 'text/csv' }),
            type: 'text/csv',
        } as RawCSVExport;
    };

    const { getProps } = useDownloadLink({
        asyncResolver,
        onStart: () => console.log('Download started...'),
        onSuccess: () => console.log('Download successful!'),
        onError: (error) => console.error('Download error:', error),
    });

    return (
        <a {...getProps()} download="data.csv">
            Download CSV
        </a>
    );
};

export default MyComponent;
```

## API

### `useDownloadLink`

```typescript
const { getProps } = useDownloadLink({
    asyncResolver: () => Promise<RawCSVExport>;
    onStart?: () => void;
    onSuccess?: () => void;
    onError?: (error: Error) => void;
});
```

- **asyncResolver**: A function that resolves the data for download asynchronously and returns a `Promise<RawCSVExport>`.
- **onStart**: (optional) A callback function that is called when the download starts.
- **onSuccess**: (optional) A callback function that is called when the download is successful.
- **onError**: (optional) A callback function that is called when an error occurs during the download.

## Types

```typescript
export type RawCSVExport = {
    file: Blob;
    type: string;
};
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please open an issue or a pull request if you have suggestions for improvements or new features.

## Acknowledgments

- Thanks to the Open Source community for their support and inspiration.
