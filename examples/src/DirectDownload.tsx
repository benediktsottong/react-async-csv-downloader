import React from 'react';
import { useDownloadLink } from 'react-async-csv-downloader';

const exampleCSV = `Name,Age,Email
Alice,30,alice@example.com
Bob,25,bob@example.com
Charlie,35,charlie@example.com
Diana,28,diana@example.com`;

export const DirectDownload = () => {
    const { getProps } = useDownloadLink({
        onStart: () => console.log('Download started'),
        onSuccess: () => console.log('Download successful'),
        onError: (error: any) => console.error('Download failed', error),
    });

    const { linkRef, ...rest } = getProps();

    return (
        <a ref={linkRef} href={`data:text/csv;charset=utf-8,\uFEFFsep=,\n${exampleCSV}`} download="document" {...rest}>
            Direct Download
        </a>
    );
};
