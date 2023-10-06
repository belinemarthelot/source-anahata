import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StyledAppBarButton from './StyledAppBarButton';

export default function StyledAppBarLogic() {
	const navigate = useNavigate();

	const [activeName, setActiveName] = useState('');
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleButtonClick = (name: string) => {
		setActiveName(name);
		navigate(name);
		setMobileOpen(!mobileOpen);
	};

	const buttonList = [
		<StyledAppBarButton
			key={'Acceuil'}
			title="Acceuil"
			name=""
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Épilation'}
			title="Épilation"
			name="epilation"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Soin visage'}
			title="Soin visage"
			name="soin-visage"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Beauté du regard'}
			title="Beauté du regard"
			name="beaute-du-regard"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Soin corps'}
			title="Soin corps"
			name="soin-corps"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Onglerie'}
			title="Onglerie"
			name="onglerie"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>
	];

	return { mobileOpen, setMobileOpen, buttonList };
}
