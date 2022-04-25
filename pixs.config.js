module.exports = {
    backend: {
        api: getPropertyOrUseDefault(process.env.BACKEND_API_URL, "http://localhost:8000"),
        resources: getPropertyOrUseDefault(process.env.BACKEND_RESOURCES_URL, "http://localhost:8000"),
    },
    frontend: "http://localhost:3000",
    iconPlaceholder: "/icon-placeholder.svg",
    useIPv6: false
}

function getPropertyOrUseDefault(property, defaultValue) {
    return property ? property : defaultValue;
}