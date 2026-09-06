import { Product } from '../types';

/**
 * Generates an official Shopify Product CSV string strictly following
 * Shopify's official product CSV format specification:
 * https://help.shopify.com/en/manual/products/import-export/using-csv
 */
export function generateShopifyCSV(products: Product[]): string {
  const headers = [
    'Handle',
    'Title',
    'Body (HTML)',
    'Vendor',
    'Product Category',
    'Type',
    'Tags',
    'Published',
    'Option1 Name',
    'Option1 Value',
    'Option2 Name',
    'Option2 Value',
    'Option3 Name',
    'Option3 Value',
    'Variant SKU',
    'Variant Grams',
    'Variant Inventory Tracker',
    'Variant Inventory Qty',
    'Variant Inventory Policy',
    'Variant Fulfillment Service',
    'Variant Price',
    'Variant Compare At Price',
    'Variant Requires Shipping',
    'Variant Taxable',
    'Variant Barcode',
    'Image Src',
    'Image Position',
    'Image Alt Text',
    'Gift Card',
    'SEO Title',
    'SEO Description',
    'Google Shopping / Google Product Category',
    'Status'
  ];

  const rows: string[][] = [headers];

  products.forEach((product) => {
    const handle = product.handle;
    const title = product.title;
    const bodyHtml = `<p>${product.description}</p><p><strong>Diamond Shape:</strong> ${product.diamondShape}</p><p><strong>Clarity & Color:</strong> ${product.clarity} / ${product.colorGrade}</p><p><strong>Certification:</strong> ${product.certification}</p>`;
    const vendor = 'Ever After Diamonds';
    const productCategory = 'Apparel & Accessories > Jewelry > Rings';
    const type = product.productType || 'Fine Jewelry';
    const tags = product.tags.join(', ');
    const published = 'TRUE';
    const status = 'active';

    // We generate variants for combinations of Metal and Carat
    let isFirstRow = true;
    let imageIndex = 1;

    product.metals.forEach((metal) => {
      product.caratOptions.forEach((carat) => {
        // Price scales with carat
        const caratMultiplier = 1 + (carat - product.defaultCarat) * 0.45;
        const metalSurcharge = metal === 'Platinum' ? 250 : metal === '18k Rose Gold' ? 100 : 0;
        const variantPrice = Math.round(product.price * caratMultiplier + metalSurcharge);
        const variantComparePrice = product.compareAtPrice 
          ? Math.round(product.compareAtPrice * caratMultiplier + metalSurcharge) 
          : '';

        const variantSku = `${product.sku}-${metal.substring(0, 2).toUpperCase()}-${carat}CT`;
        const currentImage = product.images[imageIndex - 1] || product.images[0] || '';

        const row = [
          handle,
          isFirstRow ? title : '',
          isFirstRow ? bodyHtml : '',
          isFirstRow ? vendor : '',
          isFirstRow ? productCategory : '',
          isFirstRow ? type : '',
          isFirstRow ? tags : '',
          published,
          'Metal',
          metal,
          'Carat',
          `${carat}ct`,
          'Origin',
          product.diamondType,
          variantSku,
          '50', // Grams
          'shopify',
          product.inventoryQuantity.toString(),
          'deny',
          'manual',
          variantPrice.toFixed(2),
          variantComparePrice ? variantComparePrice.toFixed(2) : '',
          'TRUE',
          'TRUE',
          '', // Barcode
          currentImage,
          imageIndex.toString(),
          `${product.title} in ${metal}`,
          'FALSE',
          `${product.title} | Ever After Diamonds UK`,
          product.tagline,
          '192', // Google taxonomy for Jewelry > Rings
          status
        ];

        rows.push(row);
        isFirstRow = false;
        if (imageIndex < product.images.length) {
          imageIndex++;
        }
      });
    });
  });

  // Convert array of arrays to CSV string escaping quotes & commas
  return rows
    .map((row) =>
      row
        .map((field) => {
          const stringField = field ? String(field) : '';
          if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
            return `"${stringField.replace(/"/g, '""')}"`;
          }
          return stringField;
        })
        .join(',')
    )
    .join('\r\n');
}

/**
 * Downloads the Shopify CSV file directly in the browser
 */
export function downloadShopifyCSV(products: Product[], filename = 'ever_after_diamonds_shopify_products.csv') {
  if (typeof window === 'undefined') return;
  const csvContent = generateShopifyCSV(products);
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Downloads complete JSON schema for Headless Shopify / Storefront API
 */
export function downloadShopifyJSON(products: Product[], filename = 'ever_after_diamonds_shopify_catalog.json') {
  if (typeof window === 'undefined') return;
  const jsonContent = JSON.stringify({
    storeName: 'Ever After Diamonds',
    domain: 'everafterdiamonds.co.uk',
    currency: 'GBP',
    contact: {
      email: 'info@everafterdiamonds.co.uk',
      phone: '020 8166 6365',
      mobile: '07737 806748',
      instagram: '@ever.after.diamonds'
    },
    productsCount: products.length,
    exportedAt: new Date().toISOString(),
    products
  }, null, 2);

  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
