import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../slices/customerSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Sidenav from './Sidenav';

function BillGenerator() {
  const [customerName, setCustomerName] = useState('');
  const [customerMobile, setCustomerMobile] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [billingDate, setBillingDate] = useState('');
  const [products, setProducts] = useState([
    { id: Date.now(), name: '', quantity: 0, price: 0 },
  ]);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const handleAddProduct = () => {
    setProducts([
      ...products,
      { id: Date.now(), name: '', quantity: 0, price: 0 },
    ]);
  };

  const handleProductChange = (id, field, value) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      )
    );
  };

  const calculateTotal = () => {
    return products.reduce(
      (total, product) => total + product.quantity * product.price,
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: Date.now(),
      name: customerName,
      quantity: products.reduce(
        (total, product) => total + product.quantity,
        0
      ),
      billingDate,
      contact: customerMobile,
      address: customerAddress,
      price: calculateTotal(),
    };
    dispatch(addCustomer(newCustomer));
    setShowModal(true);
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('BillEase', 105, 15, { align: 'center' });

    doc.setFontSize(18);
    doc.text('Invoice', 105, 25, { align: 'center' });

    doc.setFontSize(12);
    const customerDetails = [
      `Customer: ${customerName}`,
      `Mobile: ${customerMobile}`,
      `Address: ${customerAddress}`,
      `Date: ${billingDate}`,
    ];
    customerDetails.forEach((detail, index) => {
      doc.text(detail, 20, 40 + index * 8);
    });

    const tableColumn = ['Product', 'Quantity', 'Price (₹)', 'Total (₹)'];
    const tableRows = products.map((product) => [
      product.name,
      product.quantity.toString(),
      `₹${product.price.toFixed(2)}`,
      `₹${(product.quantity * product.price).toFixed(2)}`,
    ]);

    doc.autoTable({
      startY: 80,
      head: [tableColumn],
      body: tableRows,
      theme: 'grid',
      styles: { fontSize: 10 },
    });

    const finalY = doc.lastAutoTable.finalY || 80;
    doc.text(`Total: ₹${calculateTotal().toFixed(2)}`, 150, finalY + 10, {
      align: 'right',
    });

    doc.save('invoice.pdf');
  };

  return (
    <div className='flex h-full bg-gray-100 dark:bg-gray-900'>
      <div className='w-64'>
        <Sidenav />
      </div>
      <div className='flex-1 p-10'>
        <div className='max-w-4xl mx-auto'>
          <h2 className='text-2xl font-bold mb-4 text-gray-800 dark:text-white'>
            Bill Generator
          </h2>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div>
              <label
                htmlFor='customerName'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Customer Name
              </label>
              <input
                type='text'
                id='customerName'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>
            <div>
              <label
                htmlFor='customerMobile'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Customer Mobile Number
              </label>
              <input
                type='tel'
                id='customerMobile'
                value={customerMobile}
                onChange={(e) => setCustomerMobile(e.target.value)}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>
            <div>
              <label
                htmlFor='customerAddress'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Customer Address
              </label>
              <textarea
                id='customerAddress'
                value={customerAddress}
                onChange={(e) => setCustomerAddress(e.target.value)}
                required
                rows={3}
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              ></textarea>
            </div>
            <div>
              <label
                htmlFor='billingDate'
                className='block text-sm font-medium text-gray-700 dark:text-gray-300'
              >
                Billing Date
              </label>
              <input
                type='date'
                id='billingDate'
                value={billingDate}
                onChange={(e) => setBillingDate(e.target.value)}
                required
                className='mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
              />
            </div>
            {products.map((product, index) => (
              <div key={product.id} className='space-y-2 '>
                <input
                  type='text'
                  placeholder='Product Name'
                  value={product.name}
                  onChange={(e) =>
                    handleProductChange(product.id, 'name', e.target.value)
                  }
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
                <input
                  type='number'
                  min={0}
                  placeholder='Quantity'
                  value={product.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      product.id,
                      'quantity',
                      parseInt(e.target.value)
                    )
                  }
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
                <input
                  type='number'
                  min={0}
                  placeholder='Price'
                  value={product.price}
                  onChange={(e) =>
                    handleProductChange(
                      product.id,
                      'price',
                      parseFloat(e.target.value)
                    )
                  }
                  className='block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white'
                />
              </div>
            ))}
            <button
              type='button'
              onClick={handleAddProduct}
              className='mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600'
            >
              Add Product
            </button>
            <div>
              <p className='text-lg font-semibold text-gray-800 dark:text-white'>
                Total: ₹{calculateTotal().toFixed(2)}
              </p>
            </div>
            <button
              type='submit'
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-600'
            >
              Generate Bill
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div
          className='fixed z-10 inset-0 overflow-y-auto'
          aria-labelledby='modal-title'
          role='dialog'
          aria-modal='true'
        >
          <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
            <div
              className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity'
              aria-hidden='true'
            ></div>
            <span
              className='hidden sm:inline-block sm:align-middle sm:h-screen'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full dark:bg-gray-800'>
              <div className='bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-gray-800'>
                <div className='sm:flex sm:items-start'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3
                      className='text-lg leading-6 font-medium text-gray-900 dark:text-white'
                      id='modal-title'
                    >
                      Success
                    </h3>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500 dark:text-gray-300'>
                        The bill has been generated successfully and added to
                        the customers list.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse dark:bg-gray-700'>
                <button
                  type='button'
                  className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm dark:bg-indigo-500 dark:hover:bg-indigo-600'
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  type='button'
                  className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500'
                  onClick={generatePDF}
                >
                  Download Invoice
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BillGenerator;
