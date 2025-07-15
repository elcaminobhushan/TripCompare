import React from 'react';
import { ChatResponseData } from '../../types/chat';
import { DivideIcon as LucideIcon, Bean as Beach, Space as Spa, Utensils } from 'lucide-react';

interface ResponseRendererProps {
  response: ChatResponseData;
}

const ResponseRenderer: React.FC<ResponseRendererProps> = ({ response }) => {
  const getIcon = (name: string): LucideIcon => {
    switch (name) {
      case 'beach': return Beach;
      case 'spa': return Spa;
      case 'restaurant': return Utensils;
      default: return Beach;
    }
  };

  const renderTable = () => {
    if (!response.data?.table) return null;
    return (
      <div className="mt-4 bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {response.data.table.headers.map((header, index) => (
                <th key={index} className="px-4 py-2 text-left text-sm font-medium text-gray-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {response.data.table.rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-2 text-sm text-gray-700">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderImageGrid = () => {
    if (!response.data?.images) return null;
    return (
      <div className="mt-4 grid grid-cols-3 gap-4">
        {response.data.images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.url}
              alt={image.caption}
              className="w-full h-32 object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity rounded-lg" />
            <p className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/60 to-transparent rounded-b-lg">
              {image.caption}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const renderIcons = () => {
    if (!response.data?.icons) return null;
    return (
      <div className="flex gap-4 mt-3">
        {response.data.icons.map((icon, index) => {
          const IconComponent = getIcon(icon.name);
          return (
            <div
              key={index}
              className={`p-2 rounded-full bg-${icon.color}-100 text-${icon.color}-600`}
            >
              <IconComponent className="h-5 w-5" />
            </div>
          );
        })}
      </div>
    );
  };

  const renderText = () => {
    if (!response.data?.text && !response.content) return null;
    return (
      <div className="mt-2">
        {response.data?.text && <p className="text-gray-700 mb-2">{response.data.text}</p>}
        {response.content && <p className="text-gray-700">{response.content}</p>}
      </div>
    );
  };

  if (response.type === 'composite') {
    return (
      <div className="space-y-4">
        {renderText()}
        {renderIcons()}
        {renderTable()}
        {renderImageGrid()}
      </div>
    );
  }

  // Handle individual response types
  switch (response.type) {
    case 'table':
      return renderTable();
    case 'image-grid':
      return renderImageGrid();
    case 'text':
      return (
        <div className="mt-2">
          <p className="text-gray-700">{response.content}</p>
          {renderIcons()}
        </div>
      );
    default:
      return <p className="mt-2 text-gray-700">{response.content}</p>;
  }
};

export default ResponseRenderer;