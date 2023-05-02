import React from 'react';
import comingSoon from '../../images/coming soon.png';

export default function ComingSoon() {
  return (
    <>
      <div className="container py-5 text-center">
        <img src={comingSoon} alt="coming soon" className="w-50" />
      </div>
    </>
  );
}