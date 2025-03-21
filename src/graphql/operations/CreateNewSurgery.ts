interface SurgeryInput {
  name: string;
  description: string;
  amount: number;
  type: string;
  category: string;
  status: string;
  subcategory: string;
}

export const createNewSurgerie = async (surgery: SurgeryInput) => {
  const query = `
      mutation CreateNewSurgerie($surgery: SurgeryInput!) {
        createNewSurgerie(surgery: $surgery)
      }
    `;

  const variables = { surgery };

  try {
    const response = await fetch('https://tu-api.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await response.json();
    console.log('Respuesta del servidor:', data);
  } catch (error) {
    console.error('Error en la mutación:', error);
  }
};
