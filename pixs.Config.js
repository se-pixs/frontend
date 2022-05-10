module.exports = {
  backend: {
    internal_address: getPropertyOrUseDefault(process.env.BACKEND_INTERNAL_ADDRESS, "http://pixs-backend:8000"),
    external_address: getPropertyOrUseDefault(process.env.NEXT_PUBLIC_BACKEND_EXTERNAL_ADDRESS, "http://pixs-backend:8000")
  },
  frontend: "http://localhost:3000",
  iconPlaceholder: "/icon-placeholder.svg",
  useIPv6: false
}

function getPropertyOrUseDefault(property, defaultValue) {
  return property ? property : defaultValue;
}