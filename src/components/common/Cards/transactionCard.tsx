import React, { ReactNode } from 'react';

// Definimos la interfaz para las props del componente
interface UserType {
  id: string;
  email: string;
  last_name: string;
  first_name: string;
}

interface TransactionCardProps {
  title: string;
  status: string;
  user: UserType;
  icon?: ReactNode;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  description?: string;
  transactionId: string;
  onUpdate: () => void;
  onConfirm?: () => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  title,
  status,
  user,
  icon,
  amount,
  date,
  description,
  type,
  transactionId,
}) => {
  const handleConfirm = async () => {
    const mutation = `
          mutation UpdateTransactionStatus($status: String!, $updateTransactionStatusId: String!) {
            updateTransactionStatus(status: $status, id: $updateTransactionStatusId)
          }
        `;

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('No access token found');

      console.log('Token:', token);
      console.log('Transaction ID:', transactionId);

      const variables = {
        status: 'paid',
        updateTransactionStatusId: transactionId,
      };

      console.log('Variables being sent:', variables);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/graphql`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            query: mutation,
            variables,
          }),
        },
      );

      console.log('Raw response:', response);

      if (!response.ok) {
        console.error('HTTP Error:', response.status);
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('GraphQL Response:', data);

      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      }

      console.log('Transaction updated successfully');
    } catch (error) {
      console.error('Error al actualizar la transacción:', error);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-xl p-5 w-full max-w-xl mx-auto">
      <div className="flex items-center space-x-5">
        <div className="bg-blue-100 p-4 rounded-xl">
          {icon ?? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          )}
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-base font-semibold text-gray-800">{title}</h3>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="text-sm text-gray-500">{date}</div>
          </div>
          {description && (
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          )}
          <div className="flex justify-between items-center mt-2">
            <p
              className={`text-xl font-bold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}
            >
              {type === 'income' ? '+' : '-'} ${amount.toFixed(2)}
            </p>
            {status === 'PENDING' ? (
              <button
                onClick={handleConfirm}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-xs"
              >
                Confirmar
              </button>
            ) : (
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  status === 'SUCCESS'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
