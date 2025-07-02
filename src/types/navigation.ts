import { Socket } from 'socket.io-client';
export type RootStackParamList = {
    Landing:undefined;
    Home: undefined;
    Login: undefined;
    Signup: undefined;
    ForgotPassword: undefined;
    Profile: undefined;
    Appointments:undefined;
    Institutions:undefined;
    Appointment:undefined;
    CreateAppointment:undefined;
    ChatScreen:{socket:Socket};
    Chat:undefined;
    Notifications:undefined;
    appointment:{appointment:any}
    chat:{id:number;name:string;avatar?:any};
    
  };