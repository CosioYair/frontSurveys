export class Shared {
    public backendErrors: any;

    constructor() {
        this.backendErrors = {
            399: 'Algo salió mal',
            452: 'Correo o contraseña invalido',
            453: 'Tipo de cuenta invalido para iniciar',
            454: 'Código TFA invalido',
            455: 'Código OAuth invalido',
            456: (field) => {
                field = this.getStringField(field);
                return `El ${field} ya esta en uso`;
            },
            457: 'Usuario no encontrado',
            458: 'Código de verificación invalido',
            459: 'El código de verificación ha expirado',
            467: 'Registro no encontrado',
            468: (field) => {
                field = this.getStringField(field);
                return `El campo ${field} no puede ser nulo`;
            },
            469: (field) => {
                field = this.getStringField(field);
                return `El campo ${field} ya esta en uso`;
            },
            470: 'Respuesta incorrecta',
        };
    }

    private getStringField(field: string): string {
        switch (field) {
            case 'email':
                field = 'correo';
                break;

            case 'tagName':
                field = 'nombre de usuario';
                break;

            case 'positionStartDate':
                field = 'fecha de inicio en el puesto';
                break;

            default:
                break;
        }
        return field;
    }
}
