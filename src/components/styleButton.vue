<script>
export default {
	props: ["isOn", "text", "func", "args"],
};
</script>

<template>
	<div class="h-fit group mt-6">
		<svg
			@click="$emit(`onClick`)"
			:class="
				isOn ? `transition-all ease-in-out group-hover:scale-105` : `opacity-20`
			"
			width="360"
			height="80"
			fill="none"
			xmlns="http://www.w3.org/2000/svg">
			<path
				d="M.5 40c0-8.2236.441291-14.7978 1.6059-20.0381 1.16336-5.2346 3.0418-9.1075 5.89515-11.96085C10.8544 5.1477 14.7273 3.26926 19.9619 2.1059 25.2022.941291 31.7764.5 40 .5h280c8.224 0 14.798.441291 20.038 1.6059 5.235 1.16336 9.108 3.0418 11.961 5.89515 2.853 2.85335 4.732 6.72625 5.895 11.96085C359.059 25.2022 359.5 31.7764 359.5 40s-.441 14.7978-1.606 20.0381c-1.163 5.2346-3.042 9.1075-5.895 11.9608-2.853 2.8534-6.726 4.7318-11.961 5.8952C334.798 79.0587 328.224 79.5 320 79.5H40c-8.2236 0-14.7978-.4413-20.0381-1.6059-5.2346-1.1634-9.1075-3.0418-11.96085-5.8952-2.85335-2.8533-4.73179-6.7262-5.89515-11.9608C.941291 54.7978.5 48.2236.5 40Z"
				fill="#fff"
				fill-opacity=".09"
				stroke="#fff" />
		</svg>

		<h1
			class="select-none pointer-events-none text-4xl font-light italic absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
			:class="
				isOn ? `transition-all ease-in-out group-hover:scale-105` : `opacity-20`
			">
			{{ text }}
		</h1>
	</div>
</template>
