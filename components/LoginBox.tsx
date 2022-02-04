import Box, {BoxProps} from "@mui/material/Box"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"

interface CustomBoxProps extends BoxProps {}

interface LoginBoxProps extends CustomBoxProps {
    email: string;
    password: string;
    showPassword: boolean;
    onEmailChange?: (_: string) => void;
    onPasswordChange?: (_: string) => void;
    onShowPasswordChange?: (_: boolean) => void;
}

export default function LoginBox(props: LoginBoxProps) {
    const { sx, email, password, showPassword, onEmailChange, onPasswordChange, onShowPasswordChange } = props
    return (
        <Box sx={sx}>
            <Typography variant="h4" gutterBottom component="div">
                Login
            </Typography>
            <TextField
                sx={{ marginTop: 2 }}
                fullWidth={true}
                required={true}
                size="small"
                type="email"
                label="Email"
                onChange={(e) => { onEmailChange?.(e.target.value) }}
            />
            <TextField
                sx={{ marginTop: 2 }}
                fullWidth={true}
                required={true}
                size="small"
                label="Password"
                type={showPassword ? "text" : "password"}
                onChange={(e) => { onPasswordChange?.(e.target.value) }}
            />
            <Button
                sx={{ marginTop: 2 }}
                color="secondary"
                variant="contained"
                fullWidth={true}
                onClick={() => { console.log(email) }}
            >
                Sign in
            </Button>
            <Divider variant="middle" sx={{ mt: 2, width: "100%" }} />
            <Button
                sx={{ marginTop: 2 }}
                variant="outlined"
                fullWidth={true}
                onClick={() => { console.log("Sign up") }}
            >
                Sign up
            </Button>
        </Box>
    )
}
