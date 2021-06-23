import { createMuiTheme } from '@material-ui/core/styles';
import amber from '@material-ui/core/colors/amber';
import lightBlue from '@material-ui/core/colors/lightBlue';


const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: lightBlue
  },
  colors: {
    bgColor: '#3e3e3e',
    bgLightColor: '#888',
    bgLighterColor: '#DADADA',
    mainAccentColor: '#fecc01'
  }
});

export default theme;