import React from 'react';
import './InboxHeader.css'

function InboxHeader(props) {
  return (
    <section className='InboxHeader'>
        {props.children}
    </section>
  );
}

export { InboxHeader };