import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
library.add(fas);
export default function FontAwesome(props) {
	return <FontAwesomeIcon icon={props.icon} size={props.size} color={props.color} />;
}
