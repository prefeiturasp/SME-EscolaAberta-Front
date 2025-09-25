import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import './ConsultarNovamente.scss';

const ConsultarNovamente = (props) => (
  <Fragment>
    <p className="fonte-14">{props.texto}</p>
    <Link
      to={{
        pathname: `${props.link_to}`,
      }}
    >
      <button type="button" className={props.classe_css_btn}>
        {props.texto_btn}
      </button>
    </Link>
  </Fragment>
);

export default ConsultarNovamente;