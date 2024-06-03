import React from 'react';
import { Button } from '@mantine/core';
import {
  ArrowDownTrayIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import PdfIcon from '../Icons/PdfIcon';

const ProductCatalogue = ({ catalouge, name }) => {
  return (
    catalouge && (
      <div className="border rounded px-10 py-4">
        <h1 className="text-2xl font-semibold">Download Product Catalogue</h1>
        <div className="ml-2 mt-2 flex justify-between items-center">
          <PdfIcon className="size-5" />
          <div>{name?.slice(0, 15) + ".pdf"}</div>
          <div className="flex gap-3">
            <Link href={catalouge} target='_blank' download={true}>
            <Button variant="outline">
              <ArrowDownTrayIcon className="size-4" />
            </Button>
            </Link>
            <Link href={catalouge} target="_blank" rel="noopener noreferrer">
              <Button variant="outline">
                <ArrowTopRightOnSquareIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductCatalogue;
