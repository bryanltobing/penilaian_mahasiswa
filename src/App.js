import React, { Fragment, useState } from 'react';
import Heading from './components/Heading';
import Select from './components/Select';
import './App.css';

function App() {
  const [data, setData] = useState([
    { aspek1: '1', aspek2: '1', aspek3: '1', aspek4: '1' },
  ]);
  const [results, setResults] = useState(null);

  const handleChange = (evt, index, key) => {
    let values = [...data];
    values[index][key] = evt.target.value;

    setData(values);
  };

  const handleSubmit = () => {
    const values = [...data];

    const aspekPenilaian1 = values.map((value) => value.aspek1);
    const aspekPenilaian2 = values.map((value) => value.aspek2);
    const aspekPenilaian3 = values.map((value) => value.aspek3);
    const aspekPenilaian4 = values.map((value) => value.aspek4);

    const aspek_penilaian_1 = {};
    const aspek_penilaian_2 = {};
    const aspek_penilaian_3 = {};
    const aspek_penilaian_4 = {};

    aspekPenilaian1.forEach((data, index) => {
      aspek_penilaian_1[`mahasiswa_${index + 1}`] = Number(data);
    });
    aspekPenilaian2.forEach((data, index) => {
      aspek_penilaian_2[`mahasiswa_${index + 1}`] = Number(data);
    });
    aspekPenilaian3.forEach((data, index) => {
      aspek_penilaian_3[`mahasiswa_${index + 1}`] = Number(data);
    });
    aspekPenilaian4.forEach((data, index) => {
      aspek_penilaian_4[`mahasiswa_${index + 1}`] = Number(data);
    });

    const dataToSubmit = {
      aspek_penilaian_1,
      aspek_penilaian_2,
      aspek_penilaian_3,
      aspek_penilaian_4,
    };

    setResults(dataToSubmit);

    // reset
    setData([{ aspek1: '1', aspek2: '1', aspek3: '1', aspek4: '1' }]);
  };

  const createSelect = () => {
    return data.map((el, index) => (
      <Fragment key={index}>
        <tr>
          <td>Mahasiswa {index + 1}</td>
          <td>
            <Select
              value={el.aspek1 || 1}
              onChange={(evt) => handleChange(evt, index, `aspek1`)}
              optionAmount={10}
            />
          </td>

          <td>
            <Select
              value={el.aspek2 || 1}
              onChange={(evt) => handleChange(evt, index, `aspek2`)}
              optionAmount={10}
            />
          </td>

          <td>
            <Select
              value={el.aspek3 || 1}
              onChange={(evt) => handleChange(evt, index, `aspek3`)}
              optionAmount={10}
            />
          </td>

          <td>
            <Select
              value={el.aspek4 || 1}
              onChange={(evt) => handleChange(evt, index, `aspek4`)}
              optionAmount={10}
            />
          </td>
          <td>
            <button onClick={() => removeMahasiswa(index)}>Hapus</button>
          </td>
        </tr>
      </Fragment>
    ));
  };

  const handleAddMahasiswa = () => {
    const values = [...data];
    if (values.length > 9) {
      alert('Maksimal 10 Mahasiswa');
    } else {
      setData((state) => [
        ...state,
        { aspek1: '1', aspek2: '1', aspek3: '1', aspek4: '1' },
      ]);
    }
  };

  const removeMahasiswa = (index) => {
    const values = [...data];

    if (values?.length < 2) {
      alert('Minimal satu mahasiswa');
    } else {
      values.splice(index, 1);
      setData(values);
    }
  };

  return (
    <div className="App">
      <Heading title="Aspek Penilaian Mahasiswa" />

      <button onClick={handleAddMahasiswa}>Tambah Mahasiswa</button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Aspek Penilaian 1</th>
            <th>Aspek Penilaian 2</th>
            <th>Aspek Penilaian 3</th>
            <th>Aspek Penilaian 4</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{createSelect()}</tbody>
      </table>

      <div className="submit">
        <button onClick={handleSubmit}>Simpan</button>
      </div>

      {results && (
        <div className="result">
          <Heading title="Hasil" />
          <pre>{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
