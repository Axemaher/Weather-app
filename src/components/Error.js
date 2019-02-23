import React from 'react';

const Error = props => (
    <div className="error-div">
        <p>Miasto lub kod pocztowy niepoprawny lub nieobsługiwany</p>
        <p>Podpowiedź: Warszawa, London, Paris, Wola</p>
        <p>Kliknij poniższy przycisk aby przekierować do ostatniej poprawnie znalezionej lokalizacji</p>
        <button onClick={props.reload}>Reload</button>
    </div>
)
export default Error;