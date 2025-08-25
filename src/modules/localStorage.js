export function saveWorkspace(components) {
  localStorage.setItem('aura_workspace', JSON.stringify(components));
}

export function loadWorkspace() {
  const data = localStorage.getItem('aura_workspace');
  return data ? JSON.parse(data) : [];
}
