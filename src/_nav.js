export default {
  items: [
    {
      name: 'Dashboard',
      url: '/dashboard',
      icon: 'icon-speedometer',
    },
    {
      name: 'Imdb',
      url: '/Imdb',
      icon: 'icon-speedometer',
    },
    {
      name: 'Publishing',
      url: '/publisher',
      admin:true,
      icon: 'icon-speedometer',
      badge: {
        variant: 'danger',
        text: 'Important'
      }
    },
    {
      title: true,
      name: 'Items',
      class: '',
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Languages',
      url: '/langs',
      icon: 'fa fa-tv',
      admin:true,
      children: [
        {
          name: 'Languages List',
          url: '/langs/',
          icon: 'fa fa-navicon'
        },
        {
          name: 'New Language',
          url: '/langs/add',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      name: 'Genres',
      url: '/genres',
      icon: 'fa fa-tv',
      admin:true,
      children: [
        {
          name: 'Genres List',
          url: '/genres/',
          icon: 'fa fa-navicon'
        },
        {
          name: 'New Genre',
          url: '/genres/add',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      name: 'Movies',
      url: '/movies',
      icon: 'fa fa-tv',
      admin:false,
      movies:true,
      children: [
        {
          name: 'Movies List',
          url: '/movies/',
          icon: 'fa fa-navicon'
        },
        {
          name: 'New Movie',
          url: '/movies/add',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      name: 'ramadan',
      url: '/ramadan',
      icon: 'fa fa-tv',
      admin:false,
      children: [
        {
          name: 'مسلسل جديد',
          url: '/ramadan/add',
          icon: 'fa fa-plus'
        },
        {
          name: 'اضافة حلقة',
          url: '/ramadan/add-episode',
          icon: 'fa fa-plus'
        },
        {
          name: 'الحلقات',
          url: '/ramadan/episodesList',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      name: 'Serieses',
      url: '/serieses',
      icon: 'fa fa-tv',
      admin:false,
      Series:true,
      children: [
        {
          name: 'Serieses List',
          url: '/serieses/',
          icon: 'fa fa-navicon'
        },
        {
          name: 'Seasons List',
          url: '/serieses/seasons-list',
          icon: 'fa fa-navicon'
        },
        {
          name: 'New Series',
          url: '/serieses/add',
          icon: 'fa fa-plus'
        },
        {
          name: 'New Season',
          url: '/serieses/add-season',
          icon: 'fa fa-plus'
        },
        {
          name: 'New Episode',
          url: '/serieses/add-episode',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      name: 'Anime',   
      url: '/anime',
      admin:false,
      icon: 'fa fa-tv',
      anime:true,
      children: [
        {
          name: 'Anime List',
          url: '/anime/',
          icon: 'fa fa-navicon'
        },
        {
          name: 'Seasons List',
          url: '/anime/seasons-list',
          icon: 'fa fa-navicon'
        },
        {
          name: 'New Anime',
          url: '/anime/add',
          icon: 'fa fa-plus'
        },
        {
          name: 'New Season',
          url: '/anime/add-season',
          icon: 'fa fa-plus'
        },
        {
          name: 'New Episode',
          url: '/anime/add-episode',
          icon: 'fa fa-plus'
        },
      ]
    },
    {
      title: true,
      name: 'Users',
      class: '',
      admin:true,
      wrapper: {
        element: '',
        attributes: {}
      }
    },
    {
      name: 'Users',
      url: '/users',
      admin:true,
      icon: 'fa fa-user',
      children: [
        {
          name: 'Users List',
          url: '/users',
          icon: 'fa fa-navicon'
        },
        {
          name: 'Add User',
          url: '/users/new',
          icon: 'fa fa-plus'
        },
      ]
    },
    
  ]
}
