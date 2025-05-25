export const dashboardRouteLists = (forAdhocStaff = false) => {
  const primary = [
    {
      title: 'Street Data',
      routerLink: '/dashboard/street-data',
    }
  ]

  if (!forAdhocStaff) {
    primary.push({
      title: 'External Listings',
      routerLink: '/dashboard/external-listings',
    })
  }

  return {
    primary,
    secondary: [
      {
        title: 'Notifications',
        routerLink: '/dashboard/notifications',
      },
    ],
  }
}
