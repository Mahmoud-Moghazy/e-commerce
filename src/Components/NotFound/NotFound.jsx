import React from 'react';
// import styles from './NotFound.module.css';
import error from '../../images/error.svg'

export default function NotFound() {
  return (
    <>
      <div className="container py-5">
        <img src={error} alt="not found" className="w-100" />
      </div>
    </>
  );
}