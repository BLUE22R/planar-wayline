import { createRouter, createWebHistory } from 'vue-router';
import PlanarRoute from '@/views/components/airlineEdit/PlanarRoute.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'PlanarRoute',
			component: PlanarRoute,
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/',
		},
	],
});

export default router;
