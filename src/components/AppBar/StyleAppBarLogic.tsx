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
			key={'Accueil'}
			title="Accueil"
			name=""
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Soins corps'}
			title="Soins corps"
			name="soins-corps"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Soins visage'}
			title="Soins visage"
			name="soins-visage"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>,
		<StyledAppBarButton
			key={'Épilations'}
			title="Épilations"
			name="epilations"
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
			key={'Onglerie'}
			title="Onglerie"
			name="onglerie"
			activeName={activeName}
			handleButtonClick={handleButtonClick}
		/>
	];

	return { mobileOpen, setMobileOpen, buttonList };
}
