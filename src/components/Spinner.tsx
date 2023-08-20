import { BeatLoader } from 'react-spinners';
import { useTheme } from '@emotion/react';

function Spinner() {
	const theme = useTheme();
	return (
		<BeatLoader
			color={theme.colors.secondary}
			cssOverride={{ marginTop: '15px' }}
		/>
	);
}

export default Spinner;
