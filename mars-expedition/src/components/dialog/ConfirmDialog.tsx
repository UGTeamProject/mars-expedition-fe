import { Button, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import '../../styles.css';

type ConfirmDialogProps = {
    title: string;
    content: string;
    open: boolean;
    onClose: () => void;
    onYes: () => void;
};

function ConfirmDialog({ title, content, open, onClose, onYes }: ConfirmDialogProps) {
    return (
        <Dialog
            className="dialog"
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
            sx={{
                '& .MuiDialog-paper': {
                    borderRadius: 4,
                    padding: 2,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    minWidth: '400px',
                    maxWidth: '600px',
                },
            }}
        >
            <DialogTitle
                sx={{
                    color: 'white',
                    fontFamily: 'Monomaniac One',
                    fontWeight: 'bold',
                    fontSize: 30,
                    textAlign: 'center',
                    textTransform: 'uppercase',
                }}
            >
                {title}
            </DialogTitle>
            <DialogContent sx={{ color: 'white', textAlign: 'center' }}>
                {typeof content === 'string' ? <Typography>{content}</Typography> : content}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit" sx={{ color: 'white' }}>
                    No
                </Button>
                <Button onClick={onYes} color="primary" variant="contained">
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialog;
