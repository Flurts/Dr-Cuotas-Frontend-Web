import { useEffect, useState } from 'react';

import settings from '@/settings';

// eslint-disable-next-line no-restricted-imports
import TransactionCard from '../../components/common/Cards/transactionCard';

interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  adjudicated: Array<{
    quota_price: number;
    surgery: {
      name: string;
      description: string;
    };
  }>;
}

interface Transaction {
  id: string;
  status: string;
  user: User;
  created_at: string;
  amount?: number; // Agregado para manejar el monto de la transacción
}

interface TransactionByStatusProps {
  status: string;
}

export default function TransactionByStatus({
  status,
}: TransactionByStatusProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const query = `
        query GetTransactionByStatus($status: String!) {
          getTransactionByStatus(status: $status) {
            status
            user {
              id
              email
              first_name
              last_name
              adjudicated {
                quota_price
                surgery {
                  name
                  description
                }
              }
            }
            created_at
            id
            amount
          }
        }
      `;
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch(`${settings.API_URL}/graphql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: ` ${token}`,
          },
          body: JSON.stringify({ query, variables: { status } }),
        });
        if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
        const data = await response.json();
        if (data.errors)
          throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
        setTransactions(data.data.getTransactionByStatus || []);
      } catch (error) {
        console.error('Error al obtener las transacciones:', error);
      }
    };
    void fetchTransactions();
  }, [status]);

  const handleConfirm = async (transactionId: string) => {
    const mutation = `
      mutation UpdateTransactionStatus($status: String!, $updateTransactionStatusId: String!) {
        updateTransactionStatus(status: $status, id: $updateTransactionStatusId)
      }
    `;
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: ` ${token}`,
        },
        body: JSON.stringify({
          query: mutation,
          variables: {
            status: 'SUCCESS',
            updateTransactionStatusId: transactionId,
          },
        }),
      });
      if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
      const data = await response.json();
      if (data.errors)
        throw new Error(`GraphQL Error: ${JSON.stringify(data.errors)}`);
      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === transactionId
            ? { ...transaction, status: 'SUCCESS' }
            : transaction,
        ),
      );
    } catch (error) {
      console.error('Error al actualizar la transacción:', error);
    }
  };

  return (
    <div className="flex flex-wrap gap-10 justify-start items-start overflow-auto p-10">
      {transactions.length > 0 ? (
        transactions.map((transaction, index) => {
          const adjudicated = transaction.user.adjudicated[0] || {};
          return (
            <TransactionCard
              key={`${transaction.id}-${transaction.created_at}`}
              title={adjudicated.surgery?.name || `Transacción ${index + 1}`}
              status={transaction.status}
              user={transaction.user}
              amount={transaction.amount ?? 0}
              date={new Date(transaction.created_at).toLocaleDateString()}
              type={'income'}
              description={
                adjudicated.surgery?.description || 'Sin descripción'
              }
              transactionId={transaction.id}
              onUpdate={() => {}}
              onConfirm={() => {
                void handleConfirm(transaction.id);
              }}
            />
          );
        })
      ) : (
        <p>No hay transacciones disponibles</p>
      )}
    </div>
  );
}
