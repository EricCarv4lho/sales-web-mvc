using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using SalesWebMvc.Data;
using SalesWebMvc.Services;

var builder = WebApplication.CreateBuilder(args);

// Configuração do banco de dados
builder.Services.AddDbContext<SalesWebMvcContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("SalesWebMvcContext")
        ?? throw new InvalidOperationException("Connection string 'SalesWebMvcContext' not found."),
        builder => builder.MigrationsAssembly("SalesWebMvc")
    )
);

// Injeção de dependências
//builder.Services.AddScoped<SeedingService>();
builder.Services.AddScoped<SellerService>();

// Controllers e Swagger
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS para permitir requisições do React
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173") 
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// Seed do banco (dados iniciais)
/*using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var seedingService = services.GetRequiredService<SeedingService>();
    seedingService.Seed();
}*/

// Middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    app.UseSwagger();        
    app.UseSwaggerUI();     
    app.UseHsts();
}

// Segurança e CORS
app.UseHttpsRedirection();
app.UseCors("AllowFrontend");

app.UseRouting();
app.UseAuthorization();

// Mapear Controllers
app.MapControllers();

app.Run();
