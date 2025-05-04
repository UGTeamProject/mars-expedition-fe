import { useState, ReactNode } from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { NotificationContext } from './NotificationContext';

type Props = {
    children: ReactNode;
};

export function NotificationProvider({ children }: Props) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<AlertColor>('info');

    const show = (msg: string, sev: AlertColor = 'info') => {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <NotificationContext.Provider value={{ show }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert onClose={handleClose} severity={severity} variant="standard" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </NotificationContext.Provider>
    );
}
