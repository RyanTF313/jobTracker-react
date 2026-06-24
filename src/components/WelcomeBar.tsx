type WelcomeBarProps = {
  user: string | null;
  isReturning: boolean;
};
export const WelcomeBar = ({ user, isReturning }: WelcomeBarProps) => {
  return (
    <>
      <h3 id="welcome-message">
        {isReturning ? "Welcome back" : "Welcome"}, {user}
      </h3>
    </>
  );
};
