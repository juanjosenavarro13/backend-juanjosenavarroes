export type typeLog = 'Register' | 'Login' | 'no Scope';
export type AddProps = {
  logInfo: string;
  userid?: number;
  type?: typeLog;
};
