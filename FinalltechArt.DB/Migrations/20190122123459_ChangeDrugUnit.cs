using Microsoft.EntityFrameworkCore.Migrations;

namespace FinalltechArt.DB.Migrations
{
    public partial class ChangeDrugUnit : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DrugUnits_Visits_VisitId",
                table: "DrugUnits");

            migrationBuilder.DropIndex(
                name: "IX_DrugUnits_VisitId",
                table: "DrugUnits");

            migrationBuilder.AlterColumn<int>(
                name: "VisitId",
                table: "DrugUnits",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.CreateIndex(
                name: "IX_DrugUnits_VisitId",
                table: "DrugUnits",
                column: "VisitId",
                unique: true,
                filter: "[VisitId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_DrugUnits_Visits_VisitId",
                table: "DrugUnits",
                column: "VisitId",
                principalTable: "Visits",
                principalColumn: "VisitId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DrugUnits_Visits_VisitId",
                table: "DrugUnits");

            migrationBuilder.DropIndex(
                name: "IX_DrugUnits_VisitId",
                table: "DrugUnits");

            migrationBuilder.AlterColumn<int>(
                name: "VisitId",
                table: "DrugUnits",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_DrugUnits_VisitId",
                table: "DrugUnits",
                column: "VisitId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_DrugUnits_Visits_VisitId",
                table: "DrugUnits",
                column: "VisitId",
                principalTable: "Visits",
                principalColumn: "VisitId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
