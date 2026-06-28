import React, { useState, ChangeEvent, FormEvent } from 'react';

interface RecipientRow {
  email: string;
  [key: string]: string;
}

const Recepient: React.FC = () => {
  const [placeholders, setPlaceholders] = useState<string[]>([]);
  const [formValues, setFormValues] = useState<RecipientRow>({ email: '' });
  const [recipientsList, setRecipientsList] = useState<RecipientRow[]>([]);

  const simulateBackendFetch = (): void => {
    const backendResponse: string[] = ['Name', 'Company']; 
    setPlaceholders(backendResponse);
    
    const initialFields: RecipientRow = { email: '' };
    backendResponse.forEach(key => {
      initialFields[key] = '';
    });
    setFormValues(initialFields);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddRecipient = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!formValues.email) return alert("Email is required!");
    
    setRecipientsList(prev => [...prev, formValues]);

    const clearedFields: RecipientRow = { email: '' };
    placeholders.forEach(key => { clearedFields[key] = ''; });
    setFormValues(clearedFields);
  };

  const handleDeleteRow = (indexToDelete: number): void => {
    setRecipientsList(prev => prev.filter((_, index) => index !== indexToDelete));
  };

  const handleClearAll = (): void => {
    if (window.confirm("Are you sure you want to delete the entire list?")) {
      setRecipientsList([]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto space-y-6">
        
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div>
            <h1 className="text-2xl font-bold text-gray-990">Recipient Management</h1>
            <p className="text-sm text-gray-500">Inject dynamic template placeholders and map user details.</p>
          </div>
          <button 
            onClick={simulateBackendFetch}
            className="px-4 py-2 bg-indigo-50 text-indigo-600 font-medium rounded-lg hover:bg-indigo-100 transition-colors text-sm"
          >
            Simulate Backend Data Fetch
          </button>
        </div>

        {placeholders.length > 0 ? (
          <form onSubmit={handleAddRecipient} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Add Recipient Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formValues.email}
                  onChange={handleInputChange}
                  placeholder="user@example.com"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                />
              </div>

              {placeholders.map((key) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">{key}</label>
                  <input 
                    type="text" 
                    name={key}
                    value={formValues[key] || ''}
                    onChange={handleInputChange}
                    placeholder={`Enter ${key}`}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                  />
                </div>
              ))}
            </div>

            <button 
              type="submit"
              className="w-full md:w-auto px-5 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors text-sm shadow-sm"
            >
              Add Row to Table
            </button>
          </form>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium">No placeholders loaded yet.</p>
            <p className="text-sm text-amber-600 mt-1">Click "Simulate Backend Data Fetch" at the top right to build the interface columns.</p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">Recipient Mailing List</h2>
            {recipientsList.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-3 px-6">Email</th>
                  {placeholders.map((key) => (
                    <th key={key} className="py-3 px-6">{key}</th>
                  ))}
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {recipientsList.length > 0 ? (
                  recipientsList.map((row, index) => (
                    <tr key={index} className="hover:bg-gray-50/70 transition-colors">
                      <td className="py-3 px-6 font-medium text-gray-900">{row.email}</td>
                      {placeholders.map((key) => (
                        <td key={key} className="py-3 px-6">{row[key] || <span className="text-gray-300">—</span>}</td>
                      ))}
                      <td className="py-3 px-6 text-right">
                        <button
                          onClick={() => handleDeleteRow(index)}
                          className="text-gray-400 hover:text-red-600 font-medium transition-colors text-xs px-2 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={placeholders.length + 2} className="py-8 text-center text-gray-400 italic">
                      No recipients added to the list yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Recepient;