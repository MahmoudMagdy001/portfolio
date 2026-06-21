const SectionLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div
      className="w-8 h-8 border-2 border-primary rounded-full border-t-transparent animate-spin"
      role="status"
      aria-label="Loading section"
    />
  </div>
);

export default SectionLoader;
