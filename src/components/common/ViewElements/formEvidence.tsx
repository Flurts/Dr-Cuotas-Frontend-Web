import React, { useState } from 'react';

import settings from '@/settings';
const EvidenceType = {
  YOUTUBE: 'YOUTUBE',
  MEDIA: 'MEDIA',
};

export const EvidenceForm = () => {
  const [type, setType] = useState(EvidenceType.YOUTUBE);
  const [link, setLink] = useState('');
  const [image, setImage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // This is where you would integrate with your GraphQL client
      // Example with a fetch request:
      const response = await fetch(`${settings.API_URL}/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          query: `
            mutation CreateEvidence($type: EvidenceType!, $link: String!, $image: String!) {
              createEvidence(type: $type, link: $link, image: $image)
            }
          `,
          variables: {
            type,
            link,
            image,
          },
        }),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      setMessage('Evidencia creada exitosamente');
      setLink('');
      setImage('');
    } catch (error) {
      setMessage(`Error: ${error}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8  border border-drcuotasPrimary-bg mx-10">
      <h2 className="text-2xl font-bold text-drcuotasPrimary-text mb-6">
        Crear Evidencia
      </h2>

      {message && (
        <div
          className={`p-3 mb-4 rounded ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Tipo de Evidencia
          </label>
          <select
            id="type"
            value={type}
            onChange={(e) => {
              setType(e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value={EvidenceType.YOUTUBE}>YouTube</option>
            <option value={EvidenceType.MEDIA}>Media</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="link"
          >
            Enlace
          </label>
          <input
            id="link"
            type="text"
            value={link}
            onChange={(e) => {
              setLink(e.target.value);
            }}
            placeholder="https://"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="image"
          >
            Imagen (URL)
          </label>
          <input
            id="image"
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
            placeholder="https://"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-drcuotasPrimary hover:bg-drcuotasSecondaryPrimaryColor-bg text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-200"
        >
          {isSubmitting ? 'Procesando...' : 'Crear Evidencia'}
        </button>
      </form>
    </div>
  );
};

export default EvidenceForm;
