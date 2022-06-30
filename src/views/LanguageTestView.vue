<template>
	<v-container class="outline_lang">
		<v-layout justify-center column>
			<p>이해과제</p>
			<v-row class="test" style="padding-bottom: 30px">
				<input
					type="radio"
					id="AP"
					name="test"
					value="ap"
					v-model="test"
				/>
				<label for="AP" style="width: 91px">SCT-AP</label>
				<input
					type="radio"
					id="INS"
					name="test"
					value="ins"
					v-model="test"
				/>
				<label for="INS" style="width: 94px">SCT-INS</label>
				<input
					type="radio"
					id="COM"
					name="test"
					value="com"
					v-model="test"
				/>
				<label for="COM" style="width: 104px">SCT-COM</label>
			</v-row>

			<p>표현과제</p>
			<v-row class="test" style="padding-bottom: 50px">
				<input
					type="radio"
					id="Story"
					name="test"
					value="story"
					v-model="test"
				/>
				<label for="Story" style="width: 121px">Story Telling</label>
				<input
					type="radio"
					id="Image"
					name="test"
					value="image"
					v-model="test"
				/>
				<label for="Image" style="width: 120px">그림 설명하기</label>
				<input
					type="radio"
					id="Step"
					name="test"
					value="step"
					v-model="test"
				/>
				<label for="Step" style="width: 120px">절차 설명하기</label>
				<input
					type="radio"
					id="COWAT"
					name="test"
					value="cowat"
					v-model="test"
				/>
				<label for="COWAT" style="width: 85px">COWAT</label>
				<input
					type="radio"
					id="ANT"
					name="test"
					value="ant"
					v-model="test"
				/>
				<label for="ANT" style="width: 59px">ANT</label>
				<input
					type="radio"
					id="priming"
					name="test"
					value="priming"
					v-model="test"
				/>
				<label for="priming" style="width: 121px">SPT-priming</label>
				<input
					type="radio"
					id="completion"
					name="test"
					value="completion"
					v-model="test"
				/>
				<label for="completion" style="width: 146px"
					>SPT-completion</label
				>
				<input
					type="radio"
					id="CMPT"
					name="test"
					value="cmpt"
					v-model="test"
				/>
				<label for="CMPT" style="width: 70px">CMPT</label>
			</v-row>

			<v-data-table
				:headers="headers"
				:items="items"
				hide-default-footer
				@click:row="handleClick"
			>
				<template slot="items" slot-scope="props">
					<td>{{ props.item.u_name }}</td>
					<td>{{ props.item.u_sex }}</td>
					<td>{{ props.item.u_birth }}</td>
					<td>{{ props.item.u_telephone }}</td>
					<td>{{ props.item.u_chart_number }}</td>
					<td>{{ props.item.u_enter_path }}</td>
					<td>{{ props.item.u_cog_test }}</td>
					<td>{{ props.item.u_kbase_test }}</td>
					<td>{{ props.item.u_listen_test }}</td>
					<td>{{ props.item.u_lang_test }}</td>
					<td>{{ props.item.u_study_year }}</td>
					<td>{{ props.item.u_blank }}</td>
				</template>
			</v-data-table>
		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			test: '',
			headers: [
				{
					text: '성명',
					value: 'u_name',
					sortable: false,
					align: 'center',
				},
				{
					text: '성별',
					value: 'u_sex',
					sortable: false,
					align: 'center',
				},
				{
					text: '생년월일',
					value: 'u_birth',
					sortable: false,
					align: 'center',
				},
				{
					text: '전화번호',
					value: 'u_telephone',
					sortable: false,
					align: 'center',
				},
				{
					text: '병록번호',
					value: 'u_chart_number',
					sortable: false,
					align: 'center',
				},
				{
					text: '유입',
					value: 'u_enter_path',
					sortable: false,
					align: 'center',
				},
				{
					text: '인지검사일',
					value: 'u_cog_test',
					sortable: false,
					align: 'center',
				},
				{
					text: 'KBASE2',
					value: 'u_kbase_test',
					sortable: false,
					align: 'center',
				},
				{
					text: '청각검사일',
					value: 'u_listen_test',
					sortable: false,
					align: 'center',
				},
				{
					text: '언어검사일',
					value: 'u_lang_test',
					sortable: false,
					align: 'center',
				},
				{
					text: '학력',
					value: 'u_study_year',
					sortable: false,
					align: 'center',
				},
				{
					text: '비고',
					value: 'u_blank',
					sortable: false,
					align: 'center',
				},
			],
			items: [],
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			initialize() {
				const config = {
					method: 'get',
					url: this.$API_SERVER + '/api/examUsers',
				};
				axios(config)
					.then((response) => {
						//console.log(JSON.stringify(response.data));
						// this.items.push(response.data.data)
						this.items = response.data.data;
						//console.log(this.items)
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
			handleClick(value) {
				if (this.test == 'ap') {
					this.$router.push({
						name: 'Ap',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'ins') {
					this.$router.push({
						name: 'Ins',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'com') {
					this.$router.push({
						name: 'Com',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'story') {
					this.$router.push({
						name: 'Story',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'image') {
					this.$router.push({
						name: 'Image',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'step') {
					this.$router.push({
						name: 'Step',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'cowat') {
					this.$router.push({
						name: 'Cowat',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'ant') {
					this.$router.push({
						name: 'Ant',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'priming') {
					this.$router.push({
						name: 'Priming',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'completion') {
					this.$router.push({
						name: 'Completion',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				} else if (this.test == 'cmpt') {
					this.$router.push({
						name: 'Cmpt',
						query: {
							patient: value.u_id,
							test: this.test,
							type: 'language',
						},
					});
				}
			},
		},
	};
</script>

<style>
	.container.outline_lang {
		padding-top: 29px;
		padding-left: 150px;
		padding-right: 150px;
	}
</style>
