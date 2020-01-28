export default {
    palette: {
        primary: {
            light: "#5dcaff",
            main: "#0099cc",
            dark: "#006b9b",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ff4081",
            main: "#f50057",
            dark: "#c51162",
            contrastText: "#fff"
        }
    },
    typography: {
        useNextVariants: true
    },
    markup: {
        invisibleSeparator: {
            border: 'none',
            margin: 4
        },
        visibleSeparator: {
            borderBottom: '2px solid rgba(0,0,0,0.1)',
            margin: '10px 0'
        }
    },
    log: {
        form: {
            textAlign: 'center'
        },
        image: {
            margin: '20px auto',
            maxWidth: 100
        },
        pageTitle: {
            margin: '10px auto!important'
        },
        textField: {
            margin: '10px auto!important'
        },
        button: {
            marginTop: '20px!important',
            marginBottom: '10px!important'
        },
        customError: {
            color: 'red',
            fontSize: '0.8rem!important',
            marginTop: '10px!important'
        }
    },
    paper: {
        profile: {
            padding: 20,
            '& .image-wrapper': {
                textAlign: 'center',
                position: 'relative',
                '& button': {
                    position: 'absolute',
                    top: '80%',
                    left: '70%'
                }
            },
            '& .profile-image': {
                width: 170,
                height: 170,
                objectFit: 'cover',
                maxWidth: '100%',
                borderRadius: '50%'
            },
            '& svg.button': {
                '& svg:hover': {
                    cursor: 'pointer'
                }
            }
        },
        buttons: {
            textAlign: 'center',
            '& a': {
                margin: '20px 10px'
            }
        },
        profileDetails: {
            textAlign: 'center',
            '& span, svg': {
                verticalAlign: 'middle'
            }
        },
    }

}