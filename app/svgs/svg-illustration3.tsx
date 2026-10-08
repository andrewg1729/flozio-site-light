export default function Illustration3() {
  return (
    <svg className="image-5 flow-14" data-component="image" height="36" width="878" fill="currentColor">
      <defs>
        <linearGradient id="antGrad" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="878" y2="0" spreadMethod="repeat">
          <stop offset="0%" stopColor="#6E8CEE" />
          <stop offset="24%" stopColor="#9A6BE3" />
          <stop offset="54%" stopColor="#E23FC1" />
          <stop offset="74%" stopColor="#F96A8D" />
          <stop offset="100%" stopColor="#FDA06C" />
          <animate attributeName="x1" from="0" to="878" dur="1.25s" repeatCount="indefinite" calcMode="linear" />
          <animate attributeName="x2" from="878" to="1756" dur="1.25s" repeatCount="indefinite" calcMode="linear" />
        </linearGradient>
      </defs>
      <rect x="1.5" y="1.5" width="875" height="33" rx="12" ry="12" fill="none" stroke="url(#antGrad)" strokeWidth="2" strokeDasharray="7 6" style={{ animation: "0.55s linear 0s infinite normal none running list-view-ants" }} />
    </svg>
  );
}
