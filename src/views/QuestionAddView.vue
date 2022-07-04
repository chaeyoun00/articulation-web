<template>
	<v-container fill-height>
		<v-layout column>
			<v-flex>
				<v-layout class="questionadd">
					<span> 문항 추가 </span>
					<v-btn
						color="#7499FF"
						x-small
						dark
						fab
						@click="Register()"
						class="mt-n1 ml-2 mb-2"
						><v-icon>mdi-plus</v-icon>
					</v-btn>

					<v-select
						solo
						flat
						label="-"
						:items="numitems"
						@input="itemsPerPage = parseInt($event, 10)"
						class="numselect"
						style="margin-left: 30px"
					></v-select>
				</v-layout>

				<v-layout justify-center>
					<v-data-table
						:headers="headers"
						:items="items"
						:items-per-page="itemsPerPage"
						@page-count="pageCount = $event"
						hide-default-footer
						:page.sync="page"
					>
						<template slot="items" slot-scope="props">
							<td>{{ props.item.editBy }}</td>
							<td>{{ props.item.q_type }}</td>
							<td>{{ props.item.q_body }}</td>
							<td>{{ props.item.isValid }}</td>
						</template>
						<template v-slot:[`item.setting`]="{ item }">
							<v-btn
								@click="Edit(item)"
								text
								style="margin-top: 16px; width: 31px"
							>
								<img :src="editIcon" style="width: 30px;"/>
							</v-btn>
							<v-dialog
								v-model="dialog"
								persistent
								max-width="290"
							>
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
									<v-card-title> 문제 삭제 </v-card-title>
									<v-card-text
										>정말로 삭제하시겠습니까?</v-card-text
									>
									<v-card-actions>
										<v-spacer></v-spacer>
										<v-btn
											color="#678FFF"
											text
											@click="
												Delete(item), (dialog = false)
											"
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
				<v-pagination
					v-model="page"
					:length="pageCount"
					:total-visible="10"
				></v-pagination>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import axios from 'axios';

	export default {
		data: () => ({
			itemsPerPage: 10,
			numitems: ['5개씩', '10개씩', '15개씩'],
			editIcon: require('../assets/edit_icon.svg'),
			deleteIcon: require('../assets/delete_icon.svg'),
			headers: [
				{
					text: '입력한 사람',
					value: 'editBy',
					width: 220,
					sortable: false,
					align: 'center',
				},
				{
					text: '문제 유형',
					value: 'q_type',
					width: 220,
					sortable: false,
					align: 'center',
				},
				{
					text: '문제 텍스트',
					value: 'q_body',
					width: 235,
					sortable: false,
					align: 'center',
				},
				{
					text: '문제 활성화 여부',
					value: 'isValid',
					width: 220,
					sortable: false,
					align: 'center',
				},
				{
					text: '수정 / 삭제',
					value: 'setting',
					width: 160,
					sortable: false,
					align: 'center',
				},
			],
			items: [],
			page: 1,
			pageCount: 0,
			dialog: false,
		}),
		mounted() {
			this.initialize();
		},
		methods: {
			Register() {
				this.$router.push('/questionadd');
			},
			initialize() {
				const config = {
					method: 'get',
					url: this.$API_SERVER + '/api/questions/noimage',
				};
				axios(config)
					.then((response) => {
						//console.log(JSON.stringify(response.data.data));
						//console.log(response.data.data)
						this.items = response.data.data;
						for (let i = 0; i < this.items.length; i++) {
							this.items[i].q_body = this.items[i].q_body.replace(
								/,/g,
								' '
							);
						}
					})
					.catch((error) => {
						console.log(error.response);
					});
			},
			Edit(item) {
				this.$router.push({
					name: 'QuestionEdit',
					query: { data: item.q_id },
				});
			},
			Delete(item) {
				const url = this.$API_SERVER + '/api/questions?id=' + item.q_id;

				var config = {
					method: 'delete',
					url: url,
					headers: {
						//
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
	.v-data-table {
		border: 1px solid #c9c9c9;
		border-radius: 20px;
	}

	.v-data-table-header {
		background-color: #e8e8e8;
		height: 68px;
	}

	.theme--light.v-data-table
		> .v-data-table__wrapper
		> table
		> thead
		> tr
		> th {
		color: #678fff;
		font-size: 16px;
	}

	.theme--light.v-data-table
		> .v-data-table__wrapper
		> table
		> thead
		> tr
		> th:last-child {
		border-radius: 0 20px 20px 0;
	}

	.theme--light.v-data-table
		> .v-data-table__wrapper
		> table
		> thead
		> tr
		> th:first-child {
		border-radius: 20px 0 0 20px;
	}

	.questionadd {
		margin-top: 186px;
		margin-left: 177px;
	}

	.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
	.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
	.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td {
		font-size: 0.875rem;
		height: 67px;
	}
</style>
