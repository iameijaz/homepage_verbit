import React, { useState } from 'react';
import './App.css';
import AudioRecorder from './Components/AudioRecorder'
function App() {
  const [csvData, setCsvData] = useState([]);
  const [showTable, setShowTable] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const contents = e.target.result;
        const parsedData = contents.split('\n').map((row) => row.split(','));
        setCsvData(parsedData);
        setShowTable(true);
      };
      reader.readAsText(file);
    }
  };

  const handleSaveChanges = () => {
    // Create a modified copy of the data including the hidden column
    const modifiedData = csvData.map((row, rowIndex) => {
      if (rowIndex === 0) {
        // Include header names for all columns when saving
        return row.join(',');
      }
      // Include all columns for data rows
      return row.join(',');
    });

    // Combine modified data into a single string
    const modifiedCSV = modifiedData.join('\n');

    // Create a Blob with the modified CSV data
    const blob = new Blob([modifiedCSV], { type: 'text/csv' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create an anchor element to trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified_data.csv';

    // Trigger a click event on the anchor to download the file
    a.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className="App">
      <header className="App-header">
      
<div className="container my-2">
<div className="fileBtn btn btn-danger mx-2">Upload a File
<input className="fileUploader" type="file" accept=".csv" onChange={handleFileUpload}/>
</div>
<div className='btn btn-primary' onClick={handleSaveChanges}>Save Changes</div>
</div>

        {showTable && csvData.length > 0 && (
          <>
            <table>
  <thead>
    <tr>
      {csvData[0].slice(0, 3).map((header, index) => (
        <th key={index}>{header}</th>
      ))}
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
  {csvData.slice(1).map((row, rowIndex) => {
    // Check if the "Files" column is empty
    const isFilesColumnEmpty = !row[3] || row[3].trim() === '';

    if (isFilesColumnEmpty) {
      return null; // Skip rendering this row
    }

    return (
      <tr key={rowIndex}>
        {row.slice(0, 3).map((cell, colIndex) => (
          <td key={colIndex} contentEditable={true} onBlur={(e) => {
            const newValue = e.target.innerText;
            const updatedData = [...csvData];
            updatedData[rowIndex + 1][colIndex] = newValue;
            setCsvData(updatedData);
          }}>
            {cell}
          </td>
        ))}
        <td>
          <AudioRecorder audioTitle={row[3].trim()} />
        </td>
      </tr>
    );
  })}
</tbody>








</table>

          </>
        )}
      </header>
    </div>
  );
}

export default App;
