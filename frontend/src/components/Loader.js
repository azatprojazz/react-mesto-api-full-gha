import { SpinnerCircularSplit } from 'spinners-react';

// Компонент индикатора загрузки с анимацией
function Loader() {
  // Рендер компонента Loader
  return (
    <SpinnerCircularSplit
      size={400}
      thickness={180}
      speed={300}
      color="rgba(172, 57, 57, 1)"
      secondaryColor="rgba(76, 57, 172, 0.92)"
      className="spinner"
    ></SpinnerCircularSplit>
  );
}

export default Loader;
