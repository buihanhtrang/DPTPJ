import styles from './component.module.css'

const CompareTable = ({ compareList, closeModal }) => {
  if (compareList.length >= 2) 
  return (
    <div className={styles.compareModal}>
      <button className={styles.closeButton} onClick={closeModal}>X</button>
      <table>
        <thead>
          <tr>
            <th>Specification</th>
            {compareList.map((product, i) => (
              <th key={i}>
                <img src={product.image} alt={product.name} />
                <div>{product.name}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(compareList[0].specs).map((specKey) => (
            <tr key={specKey}>
              <td>{specKey}</td>
              {compareList.map((product, i) => (
                <td key={i}>{product.specs[specKey]}</td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
  );
};

export default CompareTable;
