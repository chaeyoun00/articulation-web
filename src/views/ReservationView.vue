<template>
	<v-container class="outline">
		<v-layout justify-center column>
			<v-row>
				<p>당일 검사자 추가</p>
				<v-btn
					color="#7499FF"
					x-small
					dark
					fab
					@click="Reservation()"
					class="mt-n1 ml-2 mb-10"
					><v-icon>mdi-plus</v-icon>
				</v-btn>

				<v-select
					solo
					flat
					label="10개씩"
					:items="numitems"
					@input="itemsPerPage = parseInt($event, 10)"
					class="mt-n3 numselect"
					style="margin-left: 30px"
				></v-select>
			</v-row>

			<v-layout justify-center class="tablelayout">
				<v-data-table
					:headers="headers"
					:items="items"
					hide-default-footer
					:items-per-page="itemsPerPage"
					@page-count="pageCount = $event"
					:page.sync="page"
					class="main-table"
				>
					<template slot="items" slot-scope="props">
						<td>{{ props.item.e_res_name }}</td>
						<td>{{ props.item.e_res_phone }}</td>
						<td>{{ props.item.e_id }}</td>
						<td>{{ props.item.e_user_id }}</td>
						<td>{{ props.item.e_type }}</td>
						<td>{{ props.item.e_date }}</td>
					</template>

					<template v-slot:[`item.setting`]="{ item }">
						<v-btn
							@click="Edit(item)"
							text
							style="margin-top: 16px; width: 31px"
						>
							<img :src="editIcon" style="width: 30px;"/>
						</v-btn>
						<v-dialog v-model="dialog" persistent max-width="290">
							<template v-slot:activator="{ on, attrs }">
								<v-btn
									v-bind="attrs"
									v-on="on"
									text
									style="margin-top: 16px; width: 31px"
								>
									<img :src="deleteIcon" style="width: 30px;"/>
								</v-btn>
							</template>
							<v-card
								style="
									width: 300px;
									height: 174px;
									font-family: 'Noto Sans KR Medium';
								"
							>
								<v-card-title> 예약 삭제 </v-card-title>
								<v-card-text
									>정말로 삭제하시겠습니까?</v-card-text
								>
								<v-card-actions>
									<v-spacer></v-spacer>
									<v-btn
										color="#678FFF"
										text
										@click="Delete(item), (dialog = false)"
									>
										삭제
									</v-btn>
									<v-btn
										color="#678FFF"
										text
										@click="dialog = false"
									>
										취소
									</v-btn>
								</v-card-actions>
							</v-card>
						</v-dialog>
					</template>
				</v-data-table>
			</v-layout>
			<v-pagination v-model="page" :length="pageCount"></v-pagination>
		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			numitems: ['5개씩', '10개씩', '15개씩'],
			editIcon: require('../assets/edit_icon.svg'),
			deleteIcon: require('../assets/delete_icon.svg'),
			itemsPerPage: 10,
			page: 1,
			pageCount: 0,
			headers: [
				{
					text: '예약자 이름',
					value: 'e_res_name',
					sortable: false,
					align: 'center',
					width: 157,
				},
				{
					text: '예약자 전화번호',
					value: 'e_res_phone',
					sortable: false,
					align: 'center',
					width: 157,
				},
				{
					text: '예약 번호',
					value: 'e_id',
					sortable: false,
					align: 'center',
					width: 130,
				},
				{
					text: '검사자 번호',
					value: 'e_user_id',
					sortable: false,
					align: 'center',
					width: 157,
				},
				{
					text: '검사 타입',
					value: 'e_type',
					sortable: false,
					align: 'center',
					width: 157,
				},
				{
					text: '검사 일시',
					value: 'e_date',
					sortable: false,
					align: 'center',
					width: 157,
				},
				{
					text: '수정/삭제',
					value: 'setting',
					sortable: false,
					align: 'center',
					width: 130,
				},
			],
			items: [],
			dialog: false,
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			initialize() {
				const config = {
					method: 'get',
					url: this.$API_SERVER + '/api/examReservations',
				};
				axios(config)
					.then((response) => {
						//console.log(JSON.stringify(response.data));
						this.items = response.data.data.reverse();
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
			Reservation(item) {
				this.$router.push({
					name: 'Reservation',
					query: { path: '/testedperson' },
				});
			},
			Delete(item) {
				var url =
					this.$API_SERVER + '/api/examReservations?id=' + item.e_id;

				const config = {
					method: 'delete',
					url: url,
					headers: {
						//'Content-Type': 'application/x-www-form-urlencoded'
					},
				};

				const vm = this;
				axios(config)
					.then(function (response) {
						vm.items.splice(vm.items.indexOf(item), 1);
					})
					.catch(function (error) {
						console.log(error);
					});
			},
			Edit(item) {
				this.$router.push({
					name: 'ReservationEdit',
					query: { data: item.e_id },
				});
			},
		},
	};
</script>

<style>
	.st0 {
		fill: #e3e3e3;
	}
	.st1 {
		fill: #678fff;
	}

	.v-btn {
		margin-left: 5px;
		margin-bottom: 20px;
	}

	.container.outline {
		padding-top: 187px;
		padding-left: 165px;
		padding-right: 166px;
	}
</style>
