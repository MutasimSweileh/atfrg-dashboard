import Vue from 'vue'
import Router from 'vue-router'

// Containers
const DefaultContainer = () => import('@/containers/DefaultContainer')

// Views
const Dashboard = () => import('@/views/Dashboard')
const publisher = () => import('@/views/publisher')
const Imdb = () => import('@/views/Imdb')

const Colors = () => import('@/views/theme/Colors')
const Typography = () => import('@/views/theme/Typography')

const Charts = () => import('@/views/Charts')
const Widgets = () => import('@/views/Widgets')

const LanguageList = () => import('@/views/langs/list')
const LanguageAdd  = () => import('@/views/langs/add')

const GenresList = () => import('@/views/genres/list')
const GenreAdd = () => import('@/views/genres/add')

// Views - Components
const MoviesList = () => import('@/views/movies/list')
const AddMovie = () => import('@/views/movies/add')
const Movie = () => import('@/views/movies/_id')

const ramadanAdd  = () => import('@/views/ramadan/add')
const AddEpisoderamadan  = () => import('@/views/ramadan/add-episode')
const episoderamadan  = () => import('@/views/ramadan/episodes/_id')

const SeriesesList = () => import('@/views/serieses/list')
const SeasonsList = () => import('@/views/serieses/seasons-list')
const Addseries = () => import('@/views/serieses/add')
const AddSeason = () => import('@/views/serieses/add-season')
const AddEpisode = () => import('@/views/serieses/add-episode')
const Series = () => import('@/views/serieses/_id')
const Season = () => import('@/views/serieses/seasons/_id')
const episode = () => import('@/views/serieses/seasons/episodes/_id')

const episodesRamadan  = () => import('@/views/ramadan/episodesList') 
const AnimeList = () => import('@/views/anime/list')
const AddAnime = () => import('@/views/anime/add')
const Anime = () => import('@/views/anime/_id')
const AddSAnime = () => import('@/views/anime/add-season')
const AddAnimeEpisode = () => import('@/views/anime/add-episode')
const AnimeSeasonsList = () => import('@/views/anime/seasons-list')
const AnimeSeason = () => import('@/views/anime/seasons/_id')
const Animeepisode = () => import('@/views/anime/seasons/episodes/_id')

const Cards = () => import('@/views/base/Cards')
const Forms = () => import('@/views/base/Forms')
const Switches = () => import('@/views/base/Switches')
const Tables = () => import('@/views/base/Tables')
const Tabs = () => import('@/views/base/Tabs')
const Breadcrumbs = () => import('@/views/base/Breadcrumbs')
const Carousels = () => import('@/views/base/Carousels')
const Collapses = () => import('@/views/base/Collapses')
const Jumbotrons = () => import('@/views/base/Jumbotrons')
const ListGroups = () => import('@/views/base/ListGroups')
const Navs = () => import('@/views/base/Navs')
const Navbars = () => import('@/views/base/Navbars')
const Paginations = () => import('@/views/base/Paginations')
const Popovers = () => import('@/views/base/Popovers')
const ProgressBars = () => import('@/views/base/ProgressBars')
const Tooltips = () => import('@/views/base/Tooltips')

// Views - Buttons
const StandardButtons = () => import('@/views/buttons/StandardButtons')
const ButtonGroups = () => import('@/views/buttons/ButtonGroups')
const Dropdowns = () => import('@/views/buttons/Dropdowns')
const BrandButtons = () => import('@/views/buttons/BrandButtons')

// Views - Icons
const Flags = () => import('@/views/icons/Flags')
const FontAwesome = () => import('@/views/icons/FontAwesome')
const SimpleLineIcons = () => import('@/views/icons/SimpleLineIcons')
const CoreUIIcons = () => import('@/views/icons/CoreUIIcons')

// Views - Notifications
const Alerts = () => import('@/views/notifications/Alerts')
const Badges = () => import('@/views/notifications/Badges')
const Modals = () => import('@/views/notifications/Modals')

// Views - Pages
const Page404 = () => import('@/views/pages/Page404')
const Page500 = () => import('@/views/pages/Page500')
const Login = () => import('@/views/login')
const Register = () => import('@/views/pages/Register')

// Users
const Users = () => import('@/views/users/Users')
const User = () => import('@/views/users/User')
const newUser = () => import('@/views/users/new')
const Profile  = () => import('@/views/user/profile')
Vue.use(Router)

function configRoutes() {
  return [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: DefaultContainer,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'Imdb',
          name: 'Imdb',
          component: Imdb
        },
        {
          path: 'publisher',
          name: 'Publish',
          component: publisher
        },
        {
          path: 'theme',
          redirect: '/theme/colors',
          name: 'Theme',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'colors',
              name: 'Colors',
              component: Colors
            },
            {
              path: 'typography',
              name: 'Typography',
              component: Typography
            }
          ]
        },
        {
          path: 'charts',
          name: 'Charts',
          component: Charts
        },
        {
          path: 'widgets',
          name: 'Widgets',
          component: Widgets
        },
        {
          path: 'users',
          meta: { label: 'Users'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: '',
              component: Users,
            },
            {
              path: 'new',
              name: 'new',
              component: newUser,
            },
            {
              path: ':id',
              meta: { label: 'User Details'},
              name: 'User',
              component: User,
            },

          ]
        },
        {
          path: 'user',
          meta: { label: 'User'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'profile',
              name: 'Profile',
              component: Profile,
            },
          ]
        },
        {
          path: 'langs',
          redirect: '/langs/list',
          meta: { label: 'Languages'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Languages List',
              component: LanguageList,
            },
            {
              path: 'add',
              name: 'Add Language',
              component: LanguageAdd,
            },
          ]
        },
        {
          path: 'Genres',
          redirect: '/genres/list',
          meta: { label: 'Genres'},
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Genres List',
              component: GenresList,
            },
            {
              path: 'add',
              name: 'Add Genre',
              component: GenreAdd,
            },
          ]
        },
        {
          path: 'movies',
          redirect: '/movies/list',
          name: 'Movies',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Movies List',
              component: MoviesList
            },
            {
              path: 'add',
              name: 'Add New Moive',
              component: AddMovie
            },
            {
              path: ':id',
              component: Movie
            },
          ]
        },
        {
          path: 'ramadan',
          redirect: '/ramadan/add',
          name: 'ramadan',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'add',
              name: 'ramadan add',
              component: ramadanAdd
            },
            {
              path: 'add-episode',
              name: 'Add New Episode',
              component: AddEpisoderamadan
            },
            {
              path: 'episodesList',
              path: 'episodeslist',
              component: episodesRamadan
            },
            {
              path: 'episodes/:id',
              component: episoderamadan
            },

            
          ]
        },
        {
          path: 'serieses',
          redirect: '/serieses/list',
          name: 'Serieses',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Serieses List',
              component: SeriesesList
            },
            {
              path: 'seasons-list',
              name: 'Seasons List',
              component: SeasonsList
            },
            {
              path: 'add',
              name: 'Add New Series',
              component: Addseries
            },
            {
              path: 'add-season',
              name: 'Add New Season',
              component: AddSeason 
            },
            {
              path: 'add-episode',
              name: 'Add New Episode',
              component: AddEpisode
            },
            {
              path: ':id',
              component: Series
            },
            {
              path: 'seasons/:id',
              component: Season
            },
            {
              path: 'seasons/episodes/:id',
              component: episode
            },
          ]
        },
        {
          path: 'anime',
          redirect: '/anime/list',
          name: 'Anime',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'list',
              name: 'Anime List',
              component: AnimeList
            },
            {
              path: 'seasons-list',
              name: 'Anime Seasons List',
              component: AnimeSeasonsList
            },
            {
              path: 'add',
              name: 'Add New Anime',
              component: AddAnime
            },
            {
              path: 'add-season',
              name: 'Add New Anime Season',
              component: AddSAnime 
            },
            {
              path: 'add-episode',
              name: 'Add New Anime Episode',
              component: AddAnimeEpisode
            },
            {
              path: ':id',
              component: Anime
            },
            {
              path: 'seasons/:id',
              component: AnimeSeason
            },
            {
              path: 'seasons/episodes/:id',
              component: Animeepisode
            },
            
          ]
        },
        {
          path: 'base',
          redirect: '/base/cards',
          name: 'Base',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'cards',
              name: 'Cards',
              component: Cards
            },
            {
              path: 'forms',
              name: 'Forms',
              component: Forms
            },
            {
              path: 'switches',
              name: 'Switches',
              component: Switches
            },
            {
              path: 'tables',
              name: 'Tables',
              component: Tables
            },
            {
              path: 'tabs',
              name: 'Tabs',
              component: Tabs
            },
            {
              path: 'breadcrumbs',
              name: 'Breadcrumbs',
              component: Breadcrumbs
            },
            {
              path: 'carousels',
              name: 'Carousels',
              component: Carousels
            },
            {
              path: 'collapses',
              name: 'Collapses',
              component: Collapses
            },
            {
              path: 'jumbotrons',
              name: 'Jumbotrons',
              component: Jumbotrons
            },
            {
              path: 'list-groups',
              name: 'List Groups',
              component: ListGroups
            },
            {
              path: 'navs',
              name: 'Navs',
              component: Navs
            },
            {
              path: 'navbars',
              name: 'Navbars',
              component: Navbars
            },
            {
              path: 'paginations',
              name: 'Paginations',
              component: Paginations
            },
            {
              path: 'popovers',
              name: 'Popovers',
              component: Popovers
            },
            {
              path: 'progress-bars',
              name: 'Progress Bars',
              component: ProgressBars
            },
            {
              path: 'tooltips',
              name: 'Tooltips',
              component: Tooltips
            }
          ]
        },
        {
          path: 'buttons',
          redirect: '/buttons/standard-buttons',
          name: 'Buttons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'standard-buttons',
              name: 'Standard Buttons',
              component: StandardButtons
            },
            {
              path: 'button-groups',
              name: 'Button Groups',
              component: ButtonGroups
            },
            {
              path: 'dropdowns',
              name: 'Dropdowns',
              component: Dropdowns
            },
            {
              path: 'brand-buttons',
              name: 'Brand Buttons',
              component: BrandButtons
            }
          ]
        },
        {
          path: 'icons',
          redirect: '/icons/font-awesome',
          name: 'Icons',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'coreui-icons',
              name: 'CoreUI Icons',
              component: CoreUIIcons
            },
            {
              path: 'flags',
              name: 'Flags',
              component: Flags
            },
            {
              path: 'font-awesome',
              name: 'Font Awesome',
              component: FontAwesome
            },
            {
              path: 'simple-line-icons',
              name: 'Simple Line Icons',
              component: SimpleLineIcons
            }
          ]
        },
        {
          path: 'notifications',
          redirect: '/notifications/alerts',
          name: 'Notifications',
          component: {
            render (c) { return c('router-view') }
          },
          children: [
            {
              path: 'alerts',
              name: 'Alerts',
              component: Alerts
            },
            {
              path: 'badges',
              name: 'Badges',
              component: Badges
            },
            {
              path: 'modals',
              name: 'Modals',
              component: Modals
            }
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/pages',
      redirect: '/pages/404',
      name: 'Pages',
      component: {
        render (c) { return c('router-view') }
      },
      children: [
        {
          path: '404',
          name: 'Page404',
          component: Page404
        },
        {
          path: '500',
          name: 'Page500',
          component: Page500
        },
        {
          path: 'login',
          name: 'Login',
          component: Login
        },
        {
          path: 'register',
          name: 'Register',
          component: Register
        }
      ]
    }
  ]
}

export default new Router({
  mode: 'hash', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: configRoutes()
})
